import { useState,useEffect } from '@wordpress/element';
import {  Flex, FlexItem } from '@wordpress/components';
import axios from 'axios';
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

  let hunkCompanion = 'hunk-companion';
  let themehunkCustomizer = 'themehunk-customizer';

  const themeList = [ { 
    shopmania:[
    {
    type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'th-shop-mania-pro',builder:'elementor'
    }
  ],
  gutenberg:[
    {
    type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'th-shop-mania-pro',builder:'gutenberg'
    }
  ],
  topstore:[
  { 
    type:'theme', template: 'free', name: 'top-store',free:hunkCompanion,paid:'top-store-pro', builder:'customizer'
  },
  ],
  openshop:[
  { 
    type:'theme', template: 'free', name: 'open-shop',free:hunkCompanion,paid:'openshop-pro' , builder:'customizer'
  },
  ],
  
  openmart:[
  { 
    type:'plugin', template: 'free', name: 'open-mart',free:hunkCompanion,paid:'open-mart-pro' , builder:'customizer'
  },
  ],
  
  almaira:[
  { 
    type:'theme', template: 'free', name: 'almaira-shop',free:hunkCompanion,paid:'almaira' , builder:'customizer'
  },
  ],
  
  gogo:[
  { 
    type:'plugin', template: 'free', name: 'th-shop-mania',free:hunkCompanion,paid:'gogo-pro' , builder:'customizer'
  },
  ],
  
  portfolioline:[
    { 
      type:'theme', template: 'free', name: 'portfolioline',free:hunkCompanion,paid:'portfolioline' , builder:'customizer'
    },
  ],

  bigstore:[
    { 
      type:'theme', template: 'free', name: 'big-store',free:themehunkCustomizer,paid:'big-store-pro', builder:'customizer'
    },
    ],
  

  
  }
  ];

switch(type){
  case "th-shop-mania" : return themeList[0].shopmania[0];
  case "openshop-pro" : return themeList[0].openshop[0];
  case "top-store-pro" : return themeList[0].topstore[0];
  case "open-mart" : return themeList[0].openmart[0];
  case "portfolioline" : return themeList[0].portfolioline[0];
  case "almaira" : return themeList[0].almaira[0];
  case "gogo" : return themeList[0].gogo[0];
  case "big-store" : return themeList[0].bigstore[0];
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

   const response = await fetch(HCLOCAL.ajaxurl, {
        method: 'POST',
        headers: {
          'X-WP-Nonce': HCLOCAL.security,
      },
        body: new URLSearchParams({
            action: 'hunk_companion_import_process', // Specify the WordPress AJAX action
            vsecurity: HCLOCAL.security,
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