 flexible

 npm run test


theme={theme === "system" ? undefined : theme}  


 {
  header: "Image",
  render: (event) => {
    const image = event.eventImage || "/images/placeholder.png";
    return (
      <LazyImage
        src={image}
        alt={event.eventName}
        className="rounded-lg object-cover h-10 w-20"
     
      />
    );
  },
  className: "w-25",
},