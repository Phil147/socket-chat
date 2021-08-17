import { ServerMessage } from './../server-model';
import { AuthService } from './../login/auth.service';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injector,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { takeUntil } from 'rxjs/operators';

import { ServerCommand } from '../server-model';
import { Widget } from '../widgets/widget';
import { WidgetService } from '../widgets/widget.service';

type Message = {
  user: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @ViewChild('widgetOutletFallback', { read: ViewContainerRef })
  widgetOutletFallback!: ViewContainerRef;
  @ViewChild('inp') inputElement: ElementRef;
  @ViewChildren('msg') messageElements: QueryList<ElementRef>;
  @ViewChildren('msg', { read: ViewContainerRef }) messageRefs: QueryList<ViewContainerRef>;

  destroyed$ = new Subject();
  socket: Socket;
  currWidgetRef: ComponentRef<Widget> | null = null;

  messages: Message[] = [];
  user;

  constructor(
    private widgetService: WidgetService,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private auth: AuthService) {
    this.socket = io('https://demo-chat-server.on.ag/');
    this.user = auth.getUser();
    this.subscribeToSocketEvents();
    this.subscribeToWidgetComplete();
  }

  ngAfterViewInit() {
    this.messageElements.changes.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.messageElements.last.nativeElement.scrollIntoView();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.socket.disconnect();
  }

  private subscribeToSocketEvents() {
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
      this.messages.push({ user, text });
    });

    this.socket.on('command', (data: any) => {
      console.log('server COMMAND', data)
      this.addWidget(data.command);
    });
  }

  private subscribeToWidgetComplete() {
    this.widgetService.widgetCompleted$.pipe(takeUntil(this.destroyed$)).subscribe((message: string) => {
      if (this.currWidgetRef) {
        this.currWidgetRef.destroy();
        this.currWidgetRef = null;
        console.log('COMPLETED', message);
        this.sendMessage(message);
      }
    });
  }

  sendMessage(text: string) {
    this.socket.emit('message', { author: this.user.value, message: text });
    this.inputElement.nativeElement.value = '';
  }

  sendCommand() {
    this.socket.emit('command', { author: 'Someone', message: 'shouldnt matter' });
  }

  addWidget(metadata: ServerCommand) {
    if (this.widgetService.hasCompleted(metadata.type)) {
      console.log(`${metadata.type} is already completed and takes a break.`);
      return;
    }

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
    // defer that to next change detection that the widget is fully rendered to scroll it into view
    setTimeout(() => this.currWidgetRef?.location.nativeElement.scrollIntoView());
  }

  isMessageFromUser(message: Message) {
    return message.user === this.user.value;
  }
}
