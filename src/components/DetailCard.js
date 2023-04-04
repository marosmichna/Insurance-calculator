import "./DetailCard.css"

const DetailCard = ({open, close, user, stornoTrip, sportActivities, alllMySum}) => {

    let storno = ""
    let sport = ""
    let myVariant = ""

    if(!open) return null

    const handleCancel = () => {
        close(false)
    }

    if(stornoTrip) {
         storno = "Ano"
    } else  {
         storno = "Nie"
    }

    if(sportActivities) {
        sport = "Ano"
    } else {
        sport = "Nie"
    }

    if(user.variant === "kratkodobePoistenie"){
        myVariant = "Krátkodobé Positenie"
    } else {
        myVariant = "Celoročné poistenie"
    }

    if(user.variant === "celorocnePoistenie"){
        user.endDate = null
    }

  return (
    <div className="detail-card-container">
        <div className="detail-card-value">
            <h1>Vaše Poistenie</h1>
            <p>Variant poistenia: <span>{myVariant}</span></p>
            <p>Začiatok poistenia(RRRR-MM-DD): <span>{user.startDate}</span></p>
            <p>Koniec poistenia(RRRR-MM-DD):<span>{user.endDate}</span></p>
            <p>Počet osôb poistenia: <span>{user.person}</span></p>
            <h5>Pripoistenia:</h5>
            <p>Storno cesty:<span>{storno}</span> </p>
            <p>Športové aktivity: <span>{sport}</span></p>
            <p>Celková suma poistenia: <span>{alllMySum}</span></p>
            <button onClick={handleCancel}>Close</button>
        </div>
    </div>
  )
}

export default DetailCard