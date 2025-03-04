import { useState,useEffect  } from '@wordpress/element';
import {SkeletonSingle, SkeletonTemplate} from './skeleton-loader';
import { useSelector, useDispatch } from 'react-redux';
import {addTrueFalse} from '../actions';


export default function SiteTemplate(props) {
  const [loaded, setLoaded] = useState(false);
  const [imgstyle, setImgstyle] = useState({display:'none'});

  const loader = useSelector((state)=>state.trueFalse);
  const jsonData = useSelector((state)=>state.templateData);
  const templateSelect = useSelector((state)=>state.templateSelect);  
  const dispatch = useDispatch();

const imageHandel = (template)=> {
  dispatch(addTrueFalse(false));
  // Get the modal
  var parsedData = JSON.parse(template);
  props.datatemp(parsedData);


  
 // var captionText = document.getElementById("sidebarModel");
  var captionIframe = document.getElementById("iframeModel");
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

// captionText.innerHTML = template;
}

const tmplStyleHide = {
  display: 'none',
};

const tmplStyleShow = {
  display: 'block',
};


const builderCategories = new Map([
  ['customizer', ['topstore', 'top-store-pro', 'big-store', 'openshop-pro', 'jotshop', 'open-mart', 'm-shop', 'shopline-pro', 'amaz-store', 'almaira', 'almaira-shop', 'gogo', 'novelpro', 'oneline', 'portfolioline', 'portfoliolite', 'featured']],
  ['elementor', ['th-shop-mania', 'elementor', 'royal-shop']],
  ['gutenberg', ['th-shop-mania', 'blockline', 'blockline-pro', 'blur', 'blur-pro', 'gutenberg']],
]);

const builderHandel = (builder) =>
  Array.from(builderCategories).find(([_, list]) => list.includes(builder))?.[0] || null;



// const customizer = ['topstore','top-store-pro','big-store','openshop-pro','jotshop','open-mart','m-shop','shopline-pro','amaz-store','almaira','almaira-shop','gogo','novelpro','oneline','portfolioline','portfoliolite','featured'];
// const elementor = ['th-shop-mania','elementor','royal-shop'];

// const gutenbergtmpl = ['th-shop-mania','blockline','blockline-pro','blur','blur-pro','gutenberg'];

// const builderHandel = (builder) => {
//   if (customizer.includes(builder)) {
//     return 'customizer';
//   } else if(elementor.includes(builder)){
//     return 'elementor';
//   } else if(gutenbergtmpl.includes(builder)){
//     return 'gutenberg';
//  }

// }

const imgload = () =>{

  if(loaded===false){
 setLoaded(true);
 setImgstyle({display:'block'});
  }

}


useEffect(() => {
  setTimeout(() => {
    dispatch(addTrueFalse(true));
  }, 500); // 10000 milliseconds = 10 seconds
  
}, []);


const [searchTerm, setSearchTerm] = useState('');


const filteredUsers = jsonData.filter(template =>
  template.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
        <div class="asib-main-tmpl">
{/* {loader==false && <SkeletonTemplate/>} */}

<div className='th-searchbar'>
<input 
        type="text"
        placeholder="Search by Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {Object.keys(filteredUsers).length === 0 && <div className='th-not-found-list'>No result found..</div> }

</div>
{<div class="image-container">
  
      { filteredUsers.sort((a, b) => {
    if (templateSelect.cate === "free") {
      
      return a.id > b.id ? -1 : 1;
    } else {
      return a.free_paid < b.free_paid ? -1 : 1;
    }
  }).map((template,index) => {    
  return (<div key={index} className={`column builder-${builderHandel(template.builder_theme)}` }  onClick={() => imageHandel(JSON.stringify(template))} >
<div className='asib-tmpl-column'><div class="aisb-tmpl-item" data-id={template.id}>
</div>
{loader!==true && <SkeletonSingle/> }

<img id="myImg" demourl={template.demo_url} src={template.thumb} alt={template.title}  onLoad={imgload} style={imgstyle}/>

  <div className='asib-tmpl-footer'>
    <h3>{template.title}</h3>
    {template.free_paid =="free" && <b className='freetag'>Free</b>}
    {template.free_paid =="paid" && <a className='aisb-pro' data-pro='Premium' ><img src={`${THCLOCAL.rootPath}import/admin/assets/images/pro.svg`}  alt="Premium" /></a>}
  </div>
</div>
</div>);
})}
  </div>}
</div>
    );
  }