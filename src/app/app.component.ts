import { ServerCommand } from './server-model';
import { WidgetKey, WidgetService } from './widgets/widget.service';
import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, NgZone, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { io } from 'socket.io-client';
import { Widget } from './widgets/widget';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('widgetOutletFallback', { read: ViewContainerRef })
  widgetOutletFallback!: ViewContainerRef;
  @ViewChild('inp') inputElement: ElementRef;
  @ViewChildren('msg') messageElements: QueryList<ElementRef>;
  @ViewChildren('msg', { read: ViewContainerRef}) messageRefs: QueryList<ViewContainerRef>;
  title = 'socket-chat';
  socket;
  currWidgetRef: ComponentRef<Widget> | null = null;

  messages: { user: string; text: string;}[] = [];

  constructor(
    private widgetService: WidgetService,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private zone: NgZone) {
    this.socket = io('https://demo-chat-server.on.ag/');

    this.socket.on('connect', () => {
      console.log('connected', this.socket.id);
    });

    this.socket.on('message', (data: any) => {
      console.log('server MESSAGE', data);
      // server doesn't publish the messages, instead we get a message from a bot
      // in the format of "Hey <user>, you said '<text>', right?". as a quick workaround
      // we parse the user and text out of this message.
      const parsed = (data.message as string).match(/Hey (.*),.*\'(.*)\'/);
      const [, user, text] = parsed || [];
      console.log(user, text)
      this.messages.push({ user, text });
    });

    this.socket.on('command', (data: any) => {
      console.log('server COMMAND', data)
      this.addWidget(data.command);
    });

    this.socket.onAny((event, ...args) => {
      console.log(`got ${event}`, args);
    });

    widgetService.widgetCompleted$.subscribe((message: string) => {
      if (this.currWidgetRef) {
        this.currWidgetRef.destroy();
        this.currWidgetRef = null;
        console.log('COMPLETED', message);
        this.sendMessage(message);
      }
    });
  }

  ngAfterViewInit() {
    this.messageElements.changes.subscribe(() => {
      console.log(this.messageElements);
      this.messageElements.last.nativeElement.scrollIntoView();
    });
  }

  sendMessage(text: string) {
    this.socket.emit('message', { author: 'Someone', message: text });
    this.inputElement.nativeElement.value = '';
  }

  sendCommand() {
    this.socket.emit('command', { author: 'Someone', message: 'shouldnt matter' });
  }

  addWidget(metadata: ServerCommand) {
    if (this.currWidgetRef) {
      this.currWidgetRef.destroy();
    }
    const comp = this.widgetService.getWidget(metadata.type);
    if (!comp) {
      console.log(`Couldn't find component for ${metadata}`);
      return;
    }
    /**
     * createComponent creates views as a sibling to the viewcontainerref.
     * to always show the widget in the correct spot we use the last message container
     * as reference or if there are no messages yet a fallback template at the top of the
     * message element.
     */
    const outlet = this.messageRefs.last || this.widgetOutletFallback;
    this.currWidgetRef = outlet.createComponent<Widget>(this.cfr.resolveComponentFactory<Widget>(comp), undefined, this.injector);
    if (typeof this.currWidgetRef.instance.setData === 'function') {
      this.currWidgetRef.instance.setData(metadata);
    }
  }
}
