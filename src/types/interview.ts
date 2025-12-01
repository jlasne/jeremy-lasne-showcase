export interface InterviewLink {
  label: string;
  url: string;
}

export interface Interview {
  title: string;
  description: string;
  videoId: string;
  url: string;
  links?: InterviewLink[];
}
