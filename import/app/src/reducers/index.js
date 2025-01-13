import { combineReducers } from 'redux';
import {reduxBuildrName,templateData,templateSelect,trueFalse,tmplInstall,stepLoad} from "./temperature";

const rootReducer = combineReducers( { reduxBuildrName,templateData,templateSelect,trueFalse,tmplInstall,stepLoad } );

export default rootReducer;