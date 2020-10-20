const functions = require('firebase-functions');

const  admin=require('firebase-admin')
admin.initializeApp()

exports.sendMessageNotification=functions.firestore.document("user/{user}/notifications/{notification}").onCreate(async(snapshot,context)=>{
 try {
    const notificationDocument=snapshot.data()
    const uid=context.params.uid;

    const notificationMessage=notificationDocument.message
    const notificationTitle=notificationDocument.title
    const userDoc=await admin.firestore().collection("users").doc(uid).get();

    const fcmToken=userDoc.data().fcmToken

    const message={
        "notification":{
            title:notificationTitle,
            body:notificationMessage
        },
        to:fcmToken
    }
admin.messaging.send(message)     

 } catch (error) {
     console.log(error)
 }

})