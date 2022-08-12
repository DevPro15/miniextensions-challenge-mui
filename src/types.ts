export {};

declare global {
  namespace Types {
    interface State {
      form: Record<"value", string>;
      app: {
        user?: string;
        message?: string;
        isLoggedIn: boolean;
        classes?: {
          name: string;
          students: string[];
        }[];
      };
    }
  }
}
