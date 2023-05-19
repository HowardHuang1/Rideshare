import { VStack, StackDivider, Box } from '@chakra-ui/react'
import RideCard from "./RideCard"
import "./CardStack.css"
import Searchbar from "./Searchbar"

function CardStack() {
    return(
        <div className="container" >
            <Searchbar />
            <div className="cardStack">
                <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                >
                <RideCard />
                <RideCard />
                <RideCard />
                </VStack>
            </div>
        </div>
    );
}

export default CardStack;