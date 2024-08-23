export const groupMembers = (
  members: Models.Member[] = []
): Models.AccommodationsMap => {
  const groupedData = {} as Models.AccommodationsMap;

  members.forEach((member) => {
    const { id_accommodation, name_accommodation, id_bedroom, name_bedroom } =
      member;

    if (!groupedData[id_accommodation]) {
      groupedData[id_accommodation] = {
        name_accommodation,
        bedrooms: {},
      };
    }

    if (!groupedData[id_accommodation].bedrooms[id_bedroom]) {
      groupedData[id_accommodation].bedrooms[id_bedroom] = {
        name_bedroom,
        id_bedroom,
        members: [],
      };
    }

    groupedData[id_accommodation].bedrooms[id_bedroom].members.push({
      ...member,
    });
  });

  return groupedData;
};
