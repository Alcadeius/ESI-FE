enum RoleEnum {
  Admin = '1',
  User = '2',
  EO = '3',
}

export interface IRole{
  id: RoleEnum
  name: string
}