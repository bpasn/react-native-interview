import React, { useEffect, useState, useCallback } from 'react';
import { Button, ButtonSize, Dialog, GridList, PanningProvider, View, Text, Colors, Constants } from 'react-native-ui-lib';
import ItemQuestion from '../components/ItemQuestion';
import { RefreshControl, TouchableOpacity } from 'react-native';

const HomePage = () => {
    const [questions, setQuestion] = useState<IQuestion[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [listAnswer,setListAnswer] = useState<any[]>();
    const fetchQuestions = useCallback(async () => {
        setRefreshing(true);
        try {
            let url: string = "https://opentdb.com/api.php?amount=20&type=multiple";
            const result = await fetch(url);

            if (result.ok) {
                const data: IResponseAPI = await result.json();
                console.log(data);
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
        } catch (error) {

        } finally {
            setRefreshing(false);
        }
    }, [refreshing]);
    useEffect(() => {
        if (!questions.length) {
            fetchQuestions();
        }
    }, []);
    return (
        <View marginV-10 flex-1>
            <GridList
                data={questions}
                renderItem={({ item, index }) => <ItemQuestion question={{ ...item, id: index + 1 }} setList={setListAnswer}/>}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                listPadding={20}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchQuestions} />}
                ListFooterComponent={() => {
                    return (
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'blue',
                                padding: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius:10
                            }}
                            onPress={() => {
                                setOpenDialog(!openDialog)
                            }}
                        >
                            <Text style={{ color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <Dialog
                useSafeArea
                center
                height={100}
                panDirection={Dialog.directions.UP}
                containerStyle={{
                    backgroundColor: Colors.$backgroundDefault,
                    marginBottom: Constants.isIphoneX ? 0 : 20,
                    borderRadius: 12
                }}
                visible={openDialog}
                onDismiss={() => setOpenDialog(!openDialog)}
                renderPannableHeader={() => {
                    return (
                        <View>
                            <View margin-20>
                                <Text $textDefault>{"Send your question"}</Text>
                            </View>
                            <View height={2} bg-grey70 />
                        </View>
                    );
                }}
                supportedOrientations={["portrait", "landscape"]}
                ignoreBackgroundPress={false}
            >
                <View padding-10>
                    <Text>Content</Text>
                </View>
            </Dialog>
        </View>
    );
};

export default HomePage;