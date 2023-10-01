export const generateList = (arr) => {
    return arr.map((element, key) => {
      if(element.role !== "system"){
        return(
          <li key={key}>
            <div className="liHeader">{element.role === "user" ? "You:" : "BOT:"}</div>
            <div>{element.content}</div>
          </li>
        );
      }
    })
  }