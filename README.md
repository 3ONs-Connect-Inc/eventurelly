 const isTeamBuildingPage = location.pathname === "/team-building-events";
  const isEventCategoryPage = matchPath(
    "/event-details/:collectionName/:id/:slug",
    location.pathname
  );
 <a
                    href={
                      isTeamBuildingPage || isEventCategoryPage
                        ? "/sign-up"
                        : "#teamBondingSection"
                    }
                  >