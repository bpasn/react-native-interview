import React, { useEffect, useState } from 'react'
import {  GridList,  View } from 'react-native-ui-lib';
import ItemQuestion from '../components/ItemQuestion';

const HomePage = () => {
    const [questions, setQuestion] = useState<IQuestion[]>([]);
    const getQuiz = async () => {
        let url: string = "https://opentdb.com/api.php?amount=50&type=multiple";
        const result = await fetch(url);
        if (result.ok) {
            const data: IResponseAPI = await result.json();
            const mapDataQuestion: IQuestion[] = data.results.map(q => ({
                type: q.type,
                difficulty: q.difficulty,
                category: q.category,
                question: q.question,
                correctAnswer: q.correct_answer,
                incorrectAnswers: q.incorrect_answers
            }));
            
            setQuestion(mapDataQuestion);
        }
    };
    useEffect(() => {
        getQuiz();
    }, []);
    return (
        <View row marginV-10 >
            <GridList
                data={questions}
                renderItem={({ item, index }) => <ItemQuestion question={{ ...item, id: index + 1 }} />}
                keyExtractor={(item, index) => `${index}`}
                numColumns={1}
            />
        </View>
    )
}

export default HomePage