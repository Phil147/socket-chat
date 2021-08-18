# SocketChat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Widget Mechanism
The widget components get dynamically created via `ViewContainerRef.createComponent()`. For that to work the `widget-service.ts` file holds an object `widgets` with all references to the widget components. Register additional widgets here. The chat component will ask the `WidgetService` for the component reference depending on the `type` of the server command and will dynamically insert and destroy the widget components.

All widgets must implement the interface `Widget`. It defines a unified way to get data into the widgets via the `setData` method.
If a widget is supposed to have user interaction that sends a message it should call the `completeWidget` method of the `WidgetService`.

### Widget state
Widgets that already completed should not be shown again. This state is handled inside the WidgetService. No need for any big store library at this point :).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
