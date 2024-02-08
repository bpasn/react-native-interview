import React, { useEffect, useState } from "react";
import {
    Card,
    View,
    Text,
    GridList,
    RadioButton
} from "react-native-ui-lib";
import { RadioGroup } from "react-native-ui-lib/src/components/radioGroup";
interface ItemQuestionProps {
    question: IQuestion & {
        id: number;
    };
    setList:React.Dispatch<React.SetStateAction<any[] | undefined>>
}

const ItemQuestion = ({
    question: {
        id,
        type,
        question,
        category,
        correctAnswer,
        incorrectAnswers,
        difficulty
    },
    setList
}: ItemQuestionProps) => {
    const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    const [choose, setChoose] = useState<string[]>([]);
    useEffect(() => {
        if (incorrectAnswers.length < 4) {
            incorrectAnswers.splice(random, 0, correctAnswer);
            setChoose(incorrectAnswers);
        }
    }, []);
    const handlePressRadio = (item:string) => {

    }
    const renderRadio = choose.map((item, index) => {
        return (
            <View key={index} centerV marginB-10>
                <RadioButton
                    value={item}
                    label={item}
                    onPress={()=>handlePressRadio(item)}
                />
            </View>
        );
    });
    return (
        <View marginT-20>
            <Card
                height={320}
                borderRadius={10}
            >
                <View padding-15>
                    <Text text70H>
                        {id}. {question.replace(/&quot;/g, '"').replace(/&#039;s/g, "'")}
                    </Text>
                </View>

                <View marginT-10 paddingH-20>
                    <RadioGroup
                        modifiers={{
                           
                        }}
                        initialValue={""}
                        onValueChange={() => { }}
                        forwardedRef={null}>
                        {renderRadio}
                    </RadioGroup>

                </View>
            </Card >
        </View >
    );
};

export default ItemQuestion;