interface infoSignUp {
  idUser: string;
  idCart: string;
  idFavorite: string;
  nameLevel: string;
  nameUser: string;
  profilePicture: string;
}

export interface SignData {
  message: string;
  code: string;
  value: string;
  info: infoSignUp;
}
