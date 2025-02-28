import { useState } from '@wordpress/element';
import { Flex, FlexBlock, FlexItem,Button } from '@wordpress/components';
import { Logo, Upgrade } from '../aisb';
import { __ } from '@wordpress/i18n';

export default function dashboard(props){

  const [activeTab, setActiveTab] = useState('si');

  const [ builder, setBuilder ] = useState(null);

  const builderHide = (builder_rs) => {
    setBuilder(builder_rs);
  }

  const handleClick = (active,url='')=>{
    //thunk_started
    setActiveTab(active);
    let welcomeSlug = 'thunk_started';
    switch(THCLOCAL.themeName){

      case 'th-shop-mania':
        welcomeSlug = 'th_shop_mania_thunk_started';
      break;

      case 'amaz-store':
        welcomeSlug = 'amaz_store_thunk_started';
      break;

      case 'jot-shop':
        welcomeSlug = 'jot_shop_thunk_started';
      break;

      case 'elanzalite':
        welcomeSlug = 'th_elanzalite';
      break;

      default:
         welcomeSlug = 'thunk_started';
        break;

    }

    window.location.href = THCLOCAL.baseurl+'wp-admin/themes.php?page='+welcomeSlug;
  }

  const btnStyle= { color:"#fff", 
  background:"var(--aisb-bg-color)" 
}

return(<div className='aisb-dashboard'> 
<div className='aisb-header-wrap'>
<Flex className="aisb-dashboard-header" direction={[
    'column',
    'row'
  ]}>
<FlexBlock className='aisb-logo'>
<Logo/>
<h2><a href='https://themehunk.com'>{__('ThemeHunk', 'themehunk-customizer')} </a></h2>
</FlexBlock>

<FlexBlock className='th-menu-wrap'>
<div className={`th-menu-item ${activeTab==='w' && 'active'}`} onClick={()=>handleClick('w','')}>{__('Welcome', 'themehunk-customizer')}</div>
<div className={`th-menu-item ${activeTab==='si' && 'active'}`}>{__('Import Sites', 'themehunk-customizer')}</div>
</FlexBlock>

<FlexItem>
<div className="header-text">
                <Upgrade styles = { btnStyle } version={false} />
            </div>
</FlexItem>
</Flex>
</div>

<div class="th-content">
  <div class="th-conatiner">


  <div className='aisb-left-content'>
  <h1>    Ready To Import Websites</h1>

  <p>
  Our themes and plugins are made to be easy to use, but it’s a good idea to learn how they work. You can do this by checking out our detailed instructions on documentation.

  </p>

  <a href={window.location.href+'&template=step'}>
  <h2 className='create-website'>
  <img src={THCLOCAL.pluginpath+'admin/assets/svg/create-site.svg'} />
    Create My Website
  </h2></a>

  {THCLOCAL.themeName==='th-shop-mania' && <iframe width="600" height="315" src="https://www.youtube.com/embed/MjVBKQblHW0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}


  </div>
</div>
</div>

</div>);
}