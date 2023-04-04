import { useState } from "react"
import "./Calculator.css"
import DetailCard from "./DetailCard"

const Calculator = () => {

  const [user, setUser] = useState(
    {
        variant:"kratkodobePoistenie",
        startDate:new Date().toISOString().slice(0,10),
        endDate:new Date().toISOString().slice(0,10),
        box: "zakladny",
        person: 1,
       
    })
  
  const [stornoTrip, setStornoTrip] = useState(false)
  const [sportActivities, setSportActivities] = useState(false)
  const [alllMySum, setAlllMySum] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  let variantSum = 1.2
  let allVariantSum = 0
  let diffDays = 1
  let stornoSum = 0
  let sportSum = 0
  
  const stornoTripHandler = () => {
    setStornoTrip(!stornoTrip)
  }
  
  const sportActivitiesHandler = () => {
    setSportActivities(!sportActivities)
  }

  const openModalHandler = () => {
    setOpenModal(!openModal)
  }

  const formChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({...user, [name]: value})
  }
 
  const formSubmit = (e) => {
    e.preventDefault()

    // Podmienky pre variant poistenia + balik

    if(user.variant === "kratkodobePoistenie" && user.box === "zakladny"){
        variantSum = 1.2  
    } 
    else if(user.variant === "kratkodobePoistenie" && user.box === "rozsireny"){
        variantSum = 1.8
    }
    else if(user.variant === "kratkodobePoistenie" && user.box === "extra"){
        variantSum = 2.4
    }
    else if(user.variant === "celorocnePoistenie" && user.box === "zakladny"){
        variantSum = 39
    }
    else if(user.variant === "celorocnePoistenie" && user.box === "rozsireny"){
        variantSum = 49
    }
    else if(user.variant === "celorocnePoistenie" && user.box === "extra"){
        variantSum = 59
    }

    // Podmienky pre počet dni poistenia

    if(user.variant === "kratkodobePoistenie"){
        const diffTime = Math.abs(new Date(user.endDate) - new Date(user.startDate))
        diffDays = Math.ceil((diffTime / (1000 * 60 * 60 * 24)) + 1)
    }
    
    else if(user.variant === "celorocnePoistenie"){
         diffDays = 1
    }

    // Vypočet sumy na základe variantu poistenia + balíka + počtu dní poistenia

    allVariantSum = (variantSum * user.person * diffDays)

    // Výpočet storno sumy
    
    if(stornoTrip && user.variant === "kratkodobePoistenie"){
        stornoSum = (allVariantSum/2)
    } 
    else if(stornoTrip && user.variant === "celorocnePoistenie") {
        stornoSum = (allVariantSum/5)
    }

    // Výpočet sumy v prípade že klient súhlasi so stornom pripoistením

    const myStornoSum = allVariantSum + stornoSum

    // Výpočet sumy so športovymi aktivitami

    if(sportActivities && user.variant === "kratkodobePoistenie"){
        sportSum = ((allVariantSum/100) * 30)
    } 
    else if(sportActivities && user.variant === "celorocnePoistenie") {
        sportSum = (allVariantSum/10)
    }

    // Výpočet finálnej ceny poistenia

    const finalySum = myStornoSum + sportSum
     setAlllMySum(finalySum.toFixed(2))
  }

  return (
    <div className="calculator-container">
        <h2 className="calculator-head">Vaše Poistenie</h2>
        <form onSubmit={formSubmit}>
            <label htmlFor="variant">
                Variant poistenia:
            
                <select id="variant" name="variant" value={user.variant} onChange={formChange}>
                    <option name="kratkodobePoistenie" value="kratkodobePoistenie">Krátkodobé poistenie</option>
                    <option name="celorocnePoistenie" value="celorocnePoistenie">Celoročné poistenie</option>
                </select>
            </label>
            <label>
                Začiatok poistenia:
                <input 
                    name="startDate" 
                    value={user.startDate}  
                    type="date" 
                    onChange={formChange}
                />
            </label>
            {
                user.variant === "kratkodobePoistenie" ? 
                <label>
                    Koniec poistenia: 
                    <input 
                        name="endDate"
                        value={user.endDate}
                        type="date" 
                        onChange={formChange}
                    />
                </label> : null
            }
            <label>
                Balík:
                <select name="box" value={user.box} onChange={formChange}>
                    <option name="box" value="zakladny">Základný</option>
                    <option name="box" value="rozsireny">Rozšírený</option>
                    <option name="box" value="extra">Extra</option>
                </select>
            </label>
            <label>
                Pošet Osôb:
                <select name="person" value={user.person} onChange={formChange}>
                    <option name="person" defaultValue="1">1</option>
                    <option name="person" value="2">2</option>
                    <option name="person" value="3">3</option>
                </select>
            </label>
            <h3>Pripoistenia: </h3>
            <label>
                Storno cesty:
                <input 
                    type="checkbox"
                    name="stornoTrip"
                    value={stornoTrip}
                    onChange={stornoTripHandler}  
                />
            </label>
            <label>
                Športové aktivity:
                <input 
                    type="checkbox"
                    name="sportActivities"
                    value={user.sportActivities}
                    onChange={sportActivitiesHandler}
                />
            </label>
            <input type="submit" />
        </form>
        <div className="calculator-footer">
            <p>Výsledná cena poistenia je: <span>{alllMySum}</span></p>
            <button onClick={openModalHandler}>Detail poistenia</button>
            <DetailCard
                open={openModal} 
                close={setOpenModal}
                user={user} 
                stornoTrip={stornoTrip}
                sportActivities={sportActivities}
                alllMySum={alllMySum}
            />
            <button 
                onClick={() => {window.location.reload()}}
            >
                Vynulovať dotazník
            </button>
        </div>
        
    </div>
  )
}

export default Calculator