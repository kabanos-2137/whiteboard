import { ReactSession } from 'react-client-session';

const doesSesVarExist = (sesVar) => {
  if(ReactSession.get(sesVar) != undefined){
    return true;
  }else{
    return false;
  }
}

export default doesSesVarExist;