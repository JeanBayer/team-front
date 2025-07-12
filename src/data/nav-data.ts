const LIST_NAV_USERS = {
  title: {
    to: "/user",
    text: "Usuario",
  },
  options: [
    {
      to: "/user",
      text: "Mi usuario",
    },
    {
      to: "/user/edit",
      text: "Editar",
    },
  ],
};

export const getUserNavList = () => {
  return LIST_NAV_USERS;
};

const LIST_NAV_TEAM = {
  title: {
    to: "/teams",
    text: "Equipos",
  },
  options: [
    {
      to: "/teams",
      text: "Mis equipos",
    },
    {
      to: "/teams/create",
      text: "Crear equipo",
    },
    {
      to: "/teams/join",
      text: "Unirse a un equipo",
    },
  ],
};

export const getTeamNavList = () => {
  return LIST_NAV_TEAM;
};

const LIST_NAV_SELECTED_TEAM = {
  title: {
    to: "/teams/%teamId%",
    text: "%name%",
  },
  options: [
    {
      to: "/teams/%teamId%/retrospectives",
      text: "Retrospectivas",
      end: false,
    },
    {
      to: "/teams/%teamId%/counters",
      text: "Contadores",
      end: false,
    },
    {
      to: "/teams/%teamId%/members",
      text: "Miembros",
      end: false,
    },
  ],
};

export const getSelectedTeamNavList = (teamId: string, name: string) => {
  return {
    ...LIST_NAV_SELECTED_TEAM,
    title: {
      ...LIST_NAV_SELECTED_TEAM.title,
      to: LIST_NAV_SELECTED_TEAM.title.to.replace("%teamId%", teamId),
      text: LIST_NAV_SELECTED_TEAM.title.text.replace("%name%", name),
    },
    options: LIST_NAV_SELECTED_TEAM.options.map((option) => ({
      ...option,
      to: option.to.replace("%teamId%", teamId),
    })),
  };
};
