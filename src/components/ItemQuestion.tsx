import React, { useEffect } from "react";
import {
    Card,
    View,
    Text,
    GridList,
    RadioButton
} from "react-native-ui-lib";
interface ItemQuestionProps {
    question: IQuestion & {
        id: number;
    }
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
    }
}: ItemQuestionProps) => {
    const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    useEffect(() => {
        incorrectAnswers.splice(random, 0, correctAnswer);
    }, []);
    return (
        <View marginT-20>
            <Card
                height={320}
                borderRadius={2}
            >
                <View padding-10>
                    <Text>
                        {id}. {question.replace(/&quot;/g, '"').replace(/&#039;s/g,"'")}
                    </Text>
                </View>

                <View marginT-10 paddingH-20>
                    <GridList
                        data={incorrectAnswers.slice(0, 4)}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index}>
                                    <RadioButton value={item} label={item} />
                                </View>
                            )
                        }}
                        numColumns={1}
                        listPadding={10}
                    />
                </View>
            </Card>
        </View>
    )
}

export default ItemQuestion