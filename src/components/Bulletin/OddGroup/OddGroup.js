import Odd from "../Odd//Odd";
import { ODD_GROUP_SCHEMES } from "../../../assets/schemes";

const OddGroup = (props) => {
    const odds = props.event.OCG[props.oddGroup] && props.event.OCG[props.oddGroup].OC || {};
    const scheme = ODD_GROUP_SCHEMES[props.oddGroup];
    
    return (
        <>
            {
                scheme.map((key) => {
                    return <Odd
                        key={`odd_${props.event.NID}_${key}`}
                        parentEvent={props.event}
                        oddGroup={props.event.OCG[props.oddGroup]}
                        odd={odds[key]}
                        type={props.type}
                    />
                })
            }
        </>
    );
};

export default OddGroup;