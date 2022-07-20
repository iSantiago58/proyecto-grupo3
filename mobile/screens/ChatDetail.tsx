import React, { useEffect, useRef, useState } from "react"
import {KeyboardAvoidingView, ScrollView, Text, View, StyleSheet} from "react-native"
import { db } from "../firebase"
import {
    collection,
    query,
    onSnapshot,
    doc,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    getDoc,
    updateDoc
} from 'firebase/firestore'
import Message from "../components/chat/Message"
import MessageForm from "../components/chat/MessageForm"
import colors from "../constants/colors"
import moment from "moment";

const ChatDetail = ({route, navigation}) => {
    const {usuario, currentUser} = route.params;
    const host = usuario.alias
    const endDate = usuario.endDate
    const bookingId = usuario.bookingId
    const endDateFormated = moment(endDate.toDate()).format("YYYY-MM-DD")
    const end = moment(endDateFormated)
    const today = moment()
    const diff = end.diff(today, 'days')
    const [text, setText] = useState('')
    const [msgs, setMsgs] = useState([])

    const a = Timestamp.now()
    console.log("firebase", a)
    const b = Timestamp.fromDate(new Date())
    console.log("system", b)


    const readMessage = async () =>{
        const id = `${currentUser}`+ "-" + `${host}` + "-" + `${usuario.housingId}` + "-" + `${bookingId}`
        const docSnap = await getDoc(doc(db, "ultimosMsg", id))
        if(docSnap.data()?.de !== currentUser){
            await updateDoc(doc(db, "ultimosMsg", id), { noLeido:false })
        }
    }

    useEffect(() => {
        const id = `${currentUser}`+ "-" + `${host}` + "-" + `${usuario.housingId}` + "-" + `${bookingId}`
        const msgsRef = collection(db, 'chats', id, 'mensajes')
        const q = query(msgsRef, orderBy('fechaCreacion',"asc"))
        const mens = onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(doc =>  {
                msgs.push(doc.data())
            })
            setMsgs(msgs)
            readMessage()

        })
        return () => mens()
    },[])

    const handleSubmit = async () => {
        if(text.trim() != ""){
            const id = `${currentUser}`+ "-" + `${host}` + "-" + `${usuario.housingId}` + "-" + `${bookingId}`
            await addDoc(collection(db, 'chats', id, 'mensajes'),{
                texto: text,
                de: currentUser,
                para: host,
                fechaCreacion: Timestamp.fromDate(new Date())
            })

            await setDoc(doc(db, "ultimosMsg", id), {
                texto: text,
                para: host,
                de: currentUser,
                fechaCreacion: Timestamp.fromDate(new Date()),
                noLeido: true
            }).then(()=> console.log("seteo"))

            setText('')
        }
    }
    return(
        <View style={styles.wrapper}>
            <ScrollView >
                {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg} userLog={currentUser}/>): null}
            </ScrollView>
            {diff >= 0 &&
                <KeyboardAvoidingView>
                    <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} />
                </KeyboardAvoidingView>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        backgroundColor:colors.grey30,
        justifyContent:"space-between",
    }
})

export default ChatDetail