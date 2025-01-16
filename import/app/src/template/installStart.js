import { useState,useEffect } from '@wordpress/element';
import {  Flex, FlexItem } from '@wordpress/components';
import wpPlugins from '../../assets/json/plugins.json';
import animationLoading  from '../../assets/lottie/loading';
import animationProgress  from '../../assets/lottie/progress';
import ImportAPI from './importapi';
import { getQueryArg } from '@wordpress/url';
import { useSelector, useDispatch } from 'react-redux';
import {tmplLodaing} from '../actions';
import Lottie from 'react-lottie';
import { Logo, Upgrade } from '../aisb';

function getThemeData(type){

  let themehunkCustomizer = 'themehunk-customizer';

  const themeList = [ { 
  bigstore:[
    { 
      type:'plugin', template: 'free', name: 'big-store',free:themehunkCustomizer,paid:'big-store-pro', builder:'customizer'
    },
    ],

  amazstore:[
    { 
      type:'plugin', template: 'free', name: 'amaz-store',free:themehunkCustomizer,paid:'amaz-store-pro', builder:'customizer'
    },
    ],

  mshop:[
    { 
      type:'plugin', template: 'free', name: 'm-shop',free:themehunkCustomizer,paid:'m-shop-pro', builder:'customizer'
    },
    ],

  jotshop:[
    { 
      type:'plugin', template: 'free', name: 'jot-shop',free:themehunkCustomizer,paid:'jot-shop-pro', builder:'customizer'
    },
    ],

  onelinelite:[
      { 
        type:'theme', template: 'free', name: 'oneline-lite',free:themehunkCustomizer,paid:'oneline', builder:'customizer'
      },
      ],
  
  shopline:[
      { 
        type:'theme', template: 'free', name: 'shopline',free:themehunkCustomizer,paid:'shopline-pro', builder:'customizer'
      },
      ],

  featuredlite:[
      { 
        type:'theme', template: 'free', name: 'featuredlite',free:themehunkCustomizer,paid:'featured', builder:'customizer'
      },
      ],

  elanzalite:[
      { 
        type:'theme', template: 'free', name: 'elanzalite',free:themehunkCustomizer,paid:'elanza-pro', builder:'customizer'
      },
      ],
  

  
  }
  ];

switch(type){
  case "big-store" : return themeList[0].bigstore[0];
  case "amaz-store" : return themeList[0].amazstore[0];
  case "m-shop" : return themeList[0].mshop[0];
  case "jot-shop" : return themeList[0].jotshop[0];
  case "oneline-lite" : return themeList[0].onelinelite[0];
  case "shopline" : return themeList[0].shopline[0];
  case "featuredlite" : return themeList[0].featuredlite[0];
  case "elanzalite" : return themeList[0].elanzalite[0];
  default: return  themeList[0].shopmania[0];
}

}


export default function installStart(props){
  const [ apiUrl, setApiUrl ] = useState(null);
  const dispatch = useDispatch();
  const lodaingMsg = useSelector((state)=>state.tmplInstall);

  // get theme name
  const getThemeName = () => {
    return getQueryArg( props.templateData.api_url, 'theme' );
  }

  const getPluginName = (type='') =>{
    const thmeType = getThemeData(props.templateData.builder_theme);

    if(type==='free'){
      
      return props.templateData.free_paid=='free'?thmeType.free:thmeType.paid;

    }else{
      return thmeType.type;
    }
  }
  const getBuilderName = (type='') =>{
    const thmeType = getThemeData(props.templateData.builder_theme);
    return thmeType.builder;
  }
  
  // plugin and theme install
        const process = async () =>{
          try {
           const params =  {
                      templateType: "free",
                      plugin: props.templateData.plugin,
                      allPlugins:wpPlugins,
                      builder:props.templateData.builder_theme,
                      themeSlug:getThemeName(),
                      proThemePlugin:getPluginName('free'),
                      tmplFreePro:getPluginName(),
                      wpUrl:'https://downloads.wordpress.org/',
                      thUrl:'https://themehunk.com/wp/data/'   
                    }      


                    const dataToSend = { data: params }; // Customize the data to send

   const response = await fetch(THCLOCAL.ajaxurl, {
        method: 'POST',
        headers: {
          'X-WP-Nonce': THCLOCAL.security,
      },
        body: new URLSearchParams({
            action: 'themehunk_customizer_import_process', // Specify the WordPress AJAX action
            vsecurity: THCLOCAL.security,
            data: JSON.stringify(dataToSend), // Convert the data to JSON and send it
        }),
    }).then(response => response.json())
        .then(data => {
           // console.log('ajax Theme Plugin Install ...');
           dispatch(tmplLodaing('Importing Server Data..'));
           setApiUrl(props.templateData.api_url);

        })
        .catch(error => {
            // Handle errors
            console.error('Error in AJAX request:', error);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
      }    
        }


        useEffect(() => {
          dispatch(tmplLodaing('Getting Started...'));
          process();       
        }, []); // 👈️ empty dependencies array

        const defaultLoading = {
          loop: true,
          autoplay: true, 
          animationData: animationLoading,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };
        
        const defaultProgress = {
          loop: true,
          autoplay: true, 
          animationData: animationProgress,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        };

return(<div className='aisb-site-build-wrap'>
  
  <div className='aisb-site-build'>
                <Flex className='header'>
                    <FlexItem>
                    <Logo/>
                    </FlexItem>

                    <FlexItem> <div className="header-text">
                    <Upgrade version={false}/>
            </div></FlexItem>
                </Flex>
            </div>

            <div className='aisb-site-main'>
                <div className='aisb-site-form'>
                    <h2> Getting Your Site Ready ...</h2>
 
              <Lottie options={defaultLoading} height={300} />
              <Lottie options={defaultProgress} width={300} />

              {  apiUrl===null && <span className='loading-msg'>{lodaingMsg}</span>}
              {  apiUrl && <ImportAPI apiurl = {apiUrl}  />}


                </div>
            </div>
  </div>);


}