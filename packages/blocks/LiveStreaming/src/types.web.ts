export interface IMeetingList {
  attributes: {
    created_at: Date;
    created_by: Date;
    meeting_id: string;
    meeting_link: string;
    roomId: string;
    session_link: string;
    status: boolean;
  };
  id: number;
  type: string;
}

export interface IRecordingList extends IListConstants {
  file: {
    createdAt: string;
    filePath: string;
    fileUrl: string;
    id: string;
    meta: {
      resolution: {
        width: number;
        height: number;
      };
      format: string;
      duration: number;
    };
    ratio: { number: number };
    size: number;
    type: string;
    updatedAt: string;
    userStorage: null;
  };
  fileId: string;
  updatedAt: Date;
}

export interface IHlsList extends IListConstants {
  apiKey: string;
  createdAt: string;
  downstreamUrl: string;
  duration: number;
  end: string;
  livestreamUrl: string;
  playbackHlsUrl: string;
  start: string;
  streamKey: string;
}

type IListConstants = {
  id: string;
  links: ILinks;
  mode: string;
  orientation: string;
  quality: string;
  roomId: string;
  sessionId: string;
  template: ITemplate;
  webhook: IWebhook;
};

type ILinks = {
  get_room: string;
  get_session: string;
};

type IWebhook = {
  data: string[];
  successCount: number;
  totalCount: number;
};

type ITemplate = {
  config: {
    layout: {
      gridSize: number;
      priority: string;
      type: string;
    };
  };
  isCustom: boolean;
  url: string;
};
