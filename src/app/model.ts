export  interface Post {
  showInfo: boolean;
  title: string;
  description: string;
  id: number;
  date: Date;
  hasError: any;
  similarPost:any[]
}
