interface infoSignUp {
  idUser: string;
  idCart: string;
  idFavorite: string;
  nameLevel: string;
  nameUser: string;
  profilePicture: string;
  access_token: string;
}

export interface SignData {
  message: string;
  code: string;
  value: string;
  info: infoSignUp;
}
