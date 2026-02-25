import Slider from "../../../components/Slider";
import Button from "../../../components/Button";

interface ConfigBoxProps {
    InitHp_min:number
    InitHp_max:number
    MaxTurn_min:number
    MaxTurn_max:number
    InitBudget_min:number
    InitBudget_max:number
    MaxBudget_min:number
    MaxBudget_max:number
    InterestPct_min:number
    InterestPct_max:number
    HexPurchaseCost_min:number
    HexPurchaseCost_max:number
    SpawnCost_min:number
    SpawnCost_max:number
    MaxSpawn_min:number
    MaxSpawn_max:number
}

export default function ConfigBox({InitHp_min, InitHp_max, MaxTurn_min, MaxTurn_max, InitBudget_min, InitBudget_max, MaxBudget_min, MaxBudget_max, InterestPct_min, InterestPct_max, HexPurchaseCost_min, HexPurchaseCost_max, SpawnCost_min, SpawnCost_max, MaxSpawn_min, MaxSpawn_max}:ConfigBoxProps){
    let left:number=-100;
    let borderColor:string = "grey";
    let sliderColor:string = "white";
    return(
        <>
           <div className="box-content fixed left-0 top-0 w-[50%] h-full" style={{ backgroundColor: "#B8B8B8" }}>
                           <h1 className="text-color-[#000] text-[70px] font-jersey25 tracking-[2px] absolute top-5 left-44">
                               Configuration
                               <div className="box-content fixed left-10 top-35 w-[44.5%] h-[70%]" style={{ backgroundColor: "#D9D9D9" }}>
                                   
                                       <Slider min={InitHp_min} max={InitHp_max} bottom={500} left={left} overlayText="Init HP" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={MaxTurn_min} max={MaxTurn_max} bottom={450} left={left} overlayText="Max turn" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={InitBudget_min} max={InitBudget_max} bottom={400} left={left} overlayText="Init Budget" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={MaxBudget_min} max={MaxBudget_max} bottom={350} left={left} overlayText="Max Budget" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={InterestPct_min} max={InterestPct_max} bottom={300} left={left} overlayText="Interest Pct" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={HexPurchaseCost_min} max={HexPurchaseCost_max} bottom={250} left={left} overlayText="Hex Purchase Cost" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={SpawnCost_min} max={SpawnCost_max} bottom={200} left={left} overlayText="Spawn Cost" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={MaxSpawn_min} max={MaxSpawn_max} bottom={150} left={left} overlayText="Max Spawn" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                                       <Slider min={1} max={5} bottom={100} left={left} overlayText="Each Minions Per Team" borderColor={borderColor} sliderColor={sliderColor} setState={5}></Slider>
                                       <Button src="" alt="Set To Default" overlayText="Set To Default" bottom="30" left="230" color="grey" font_size="25" height="40" width="200"></Button>
                                   
                               </div>
                           </h1>
                       </div>
        </>
    )
}