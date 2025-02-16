interface TeamMember {
  name: string
  id_game: string
  nickname: string
  position: string
  domicile: string
}

export interface IRegistration {
  competition_id: number
  team_name: string
  no_hp: string
  team_members: TeamMember[]
}