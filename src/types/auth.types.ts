export type LoginReqType = {
  body: {
    password: string;
    email: string;
  };
};

export type LoginResType = {
  status: any;
  message: string;
  isMatching: boolean;
};


export type SignupReqType = {
  body: {
    username: string;
    password: string;
    email: string;
  };
};

export type SignupResType = {
  status: any;
  message: string;
};
