import gutenberg from '../../assets/json/gutenberg.json';
import thshopmania from '../../assets/json/th-shop-mania.json';
import topstore from '../../assets/json/top-store-pro.json';
import openshop from '../../assets/json/openshop-pro.json';
import gogolite from '../../assets/json/gogo.json';
import openmart from '../../assets/json/open-mart.json';
import almairashop from '../../assets/json/almaira.json';
import portfoliolite from '../../assets/json/portfolioline.json';
import bigstore from '../../assets/json/big-store.json';
import amazstore from '../../assets/json/amaz-store.json';
// import mshop from '../../assets/json/m-shop.json';
// import jotshop from '../../assets/json/jotshop.json';
// import onelinelite from '../../assets/json/oneline.json';
// import shopline from '../../assets/json/big-store.json';
// import featuredlite from '../../assets/json/big-store.json';


const gutenbergtmpl = ['th-shop-mania','gutenberg'];
const customizer = ['top-store', 'top-store-pro', 'gogo','openshop-pro','open-shop', 'royal-shop','big-store','jotshop','open-mart','m-shop','shopline-pro','amaz-store','almaira','almaira-shop','novelpro','oneline','portfoliolite','portfolioline','featured'];
const elementor = ['th-shop-mania','elementor'];

//let jsonTheme = HCLOCAL.themeName.replace(/-/g, "");
//HCLOCAL.themeName - current theme name
// builderHandel(HCLOCAL.themeName) - builder name like elementor, customizer or gutenberg
let  jsonData = '';
switch(HCLOCAL.themeName) {
    case 'big-store':
         jsonData = gutenberg.concat(bigstore);
        break;
    case 'amaz-store':
        jsonData = gutenberg.concat(amazstore);
        break;
    case 'm-shop':
        jsonData = gutenberg.concat(mshop);
        break;
    case 'jot-shop':
        jsonData = gutenberg.concat(jotshop);
        break;
    case 'th-shop-mania':
         jsonData = gutenberg.concat(thshopmania);
        break;
    case 'top-store':
         jsonData = gutenberg.concat(topstore);
        break;
    case 'open-shop':
            jsonData = gutenberg.concat(openshop);
           break;
    case 'gogo':
            jsonData = gogolite.concat();
           break;
    case 'open-mart':
            jsonData = gutenberg.concat(openmart);
           break;
    case 'almaira-shop':
            jsonData = almairashop.concat();
           break;
    case 'portfoliolite':
            jsonData = portfoliolite.concat();
           break;
    default:
         jsonData = gutenberg.concat(thshopmania);
    }


const builderHandel = (builder) => {
        if (customizer.includes(builder)) {
            return 'customizer';
        } else if(elementor.includes(builder)){
            return 'elementor';
        } else if(gutenbergtmpl.includes(builder)){
            return 'gutenberg';
        }
}


const defaultJsonData = jsonData.filter(template => builderHandel(template.builder_theme) === builderHandel(HCLOCAL.themeName) && template.category.includes('all'));

const templateData = ( state = defaultJsonData, action) =>{

    switch(action.type){
        case "TEMPLATE_DATA" : return  jsonData.filter(template => builderHandel(template.builder_theme) === action.payload && template.category.includes(action.cate));

        default: return state;
    }

}

const reduxBuildrName = ( state = builderHandel(HCLOCAL.themeName), action) =>{
    switch(action.type){
        case "BUILDER_NAME" : return action.payload;
        default: return state;
    }

}

const templateSelect = ( state = {cate:'all',builder:builderHandel(HCLOCAL.themeName)}, action) =>{

    switch(action.type){
        case "CATE_BUILDER" : return {cate:action.payload,builder:action.builderload};

        default: return state;
    }

}
const initialStateTF = false;

const trueFalse = ( state = initialStateTF, action) =>{
    switch(action.type){
        case "ACTION" : return action.payload;
        case "BUILDER" : return action.payload;

        default: return state;
    }

}

const tmplInstall = ( state = 'Installing Start', action) =>{
    switch(action.type){
        case "INSTALL" : return action.payload;
        default: return state;
    }

}

const stepLoad = ( state = {
    iframe:false,
    createWebsite:false,
    install:false,
    sucess:false
} , action) =>{

    switch(action.type){
        case "STEP1" : return {
    iframe:action.payload,
    createWebsite:false,
    install:false,
    success:false
}

    case "STEP2" : return {
    iframe:false,
    createWebsite:action.payload,
    install:false,
    success:false
}

case "STEP3" : return {
    iframe:false,
    createWebsite:false,
    install:action.payload,
    success:false
}

case "STEP4" : return {
    iframe:false,
    createWebsite:false,
    install:false,
    success:action.payload
}
        default: return state;
    }

}



// case "ADD" : return state.concat(action.payload);

// case "REMOVE" : return state.filter(function(initialState) { return initialState !== action.payload });

export {reduxBuildrName,templateData, templateSelect, trueFalse,tmplInstall,stepLoad};

