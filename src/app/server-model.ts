export type ServerMessage = {
  author: string;
  message: string;
}

export type ServerCommand = ServerDateCommand | ServerRateCommand | ServerMapCommand | ServerCompleteCommand;

export type ServerDateCommand = {
  type: 'date';
  data: string;
}

export type ServerRateCommand = {
  type: 'rate';
  data: [number, number];
}

export type ServerMapCommand = {
  type: 'rate';
  data: { lat: number; lng: number };
}

export type ServerCompleteCommand = {
  type: 'rate';
  data: [string, string];
}