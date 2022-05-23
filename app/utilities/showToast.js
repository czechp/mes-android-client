import { ToastAndroid } from "react-native"

const showToast = (info)=>{
    ToastAndroid.show(info, ToastAndroid.LONG);
}

export default showToast;