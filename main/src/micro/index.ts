import { AppItem } from "./app-list";
import { MainLifeCycle } from "./main-life-cycle";
import { registerApp } from "./register-app";
import { start } from "./start";


export default function registerMicroApp(list:AppItem[],mainLifeCycle?: MainLifeCycle) {
    registerApp(list,mainLifeCycle)
    start()
}