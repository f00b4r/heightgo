// ***********************************************
// COMMON ****************************************
// ***********************************************

interface Structure {
  [key: string]: any
}


interface Config {
  height: {
    token: string,
    list: string,
  },
  trello: {
    key: string,
    token: string,
    boardId: string,
  },
  github: {
    token: string
  }
}

type Uuid = string;

// ***********************************************
// TRELLO ****************************************
// ***********************************************

interface TrelloCard {
  id: string,
  name: string,
  desc: string,
}

interface TrelloCardAction {
  id: string,
  data: {
    text: string,
  },
  type: string,
}

// ***********************************************
// HEIGHT ****************************************
// ***********************************************

interface HeightTask {
  id?: Uuid,
  name: string,
  listId: Uuid,
  description?: string,
  status?: string,
  assigneesIds?: Uuid[],
  parentTaskId?: Uuid,
  fields?: any[],
  orderIntent?: {
    intent: "start" | "end" | "before" | "after",
    taskId: Uuid
  },
}

interface HeightActivity {
  id?: Uuid,
  taskId: Uuid,
  type: "comment" | "description",
  message: string,
}

// ***********************************************
// GITHUB ****************************************
// ***********************************************

interface GithubOrg {
  name: string,
  description: string,
  id: number,
  login: string,
}

interface GithubMember {
  login: string,
  avatar_url: string,
}
