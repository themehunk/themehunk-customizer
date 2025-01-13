import { useState  } from '@wordpress/element';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import {addCateBuilder,templateData} from '../actions';

export default function BuilderIcon(props) {

  const reduxBuildrName = useSelector((state)=>state.reduxBuildrName);
  
  const dispatch = useDispatch();

  const [ bulderType, setbulderType ] = useState(null);
  const [builder, setBuilder] = useState(reduxBuildrName);
  const [iscate, setisCate] = useState('all');


  const handleBuilder = (event) => {
    setBuilder(event.target.value);
    dispatch(addCateBuilder(iscate,event.target.value));
    dispatch(templateData(event.target.value,iscate));

  };


  const handleCate = (event) => {
    setisCate(event.target.value);
    dispatch(addCateBuilder(event.target.value,builder));

    dispatch(templateData(builder,event.target.value));

  };

    const handelIconClick =(type)=>{
      props.builderclick(type);
      setbulderType(type);
    }


    const BootstrapInput = styled(InputBase)(({ theme }) => ({
      'label + &': {
        marginTop: theme.spacing(3),
      },
      '& .MuiInputBase-input': {
        borderRadius: 6,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderRadius: 6,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    }));


    const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getCategory = () =>{
  switch(HCLOCAL.themeName) {
      case 'th-shop-mania':
           return ['all','free','latest',"woocommerce",'multivendor','multipurpose'];
          break;
      case 'gogo':
        return ['all','free','pro'];
             break;
      case 'portfoliolite':
        return ['all','free'];
             break;
      default:
        return ['all','free',"pro","woocommerce"];
      }
}
//'latest','woocommmerce'


//'multipurpose','business','portfolio','music','landing-page','sports'



// Utility function outside of the component
const processString = (str) => {
  // Remove all dashes
  let processedStr = str.replace(/-/g, ' ');

  // Capitalize the first letter of each word
  processedStr = processedStr.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  return processedStr;

}

    return (<div className="aisb-builder-icon">
      <FormControl sx={{ m: 1, minWidth: 260 }} variant="standard" >
        <Select
          labelId="demo-select-small-labe"
          id="demo-simple-select-helper"
          value={builder}
          label="Builder"
          onChange={handleBuilder}
          input={<BootstrapInput />}
        >
          
         { reduxBuildrName==='elementor' && <MenuItem value='elementor' onClick={()=>handelIconClick('elementor')}>
          <div className={`column-icon ${bulderType=='elementor'?'active':'icon'}`} id="elementor" >
        <img src={`${HCLOCAL.pluginpath}admin/assets/images/elementor.png`} alt="Elementor Template" />
        <div className="image-text-builder-icon">Elementor</div>
        </div>
          </MenuItem>}

          { reduxBuildrName==='elementor' && <MenuItem value={'gutenberg'} onClick={()=>handelIconClick('gutenberg')}>
          <div className={`column-icon ${bulderType=='gutenberg'?'active':'icon'}`} id="gutenberg" >
        <img src={`${HCLOCAL.pluginpath}admin/assets/images/gutenberg.png`}  alt="Block Templates" />
        <div className="image-text-builder-icon" >Gutenberg</div>
        </div>
          </MenuItem> }
          { reduxBuildrName==='customizer' && <MenuItem value={'customizer'} onClick={()=>handelIconClick('customizer')}><div className={`column-icon ${bulderType=='customizer'?'active':'icon'}`} id="customizer" >
        <img src={`${HCLOCAL.pluginpath}admin/assets/images/wp.png`} alt="Customizer Template" />
        <div className="image-text-builder-icon">{processString(HCLOCAL.themeName)}</div>
        </div></MenuItem> }
        </Select>
      </FormControl>

      <FormControl className = "aisb-catelist" sx={{ m: 1, minWidth: 260 }} variant="standard">
        <Select
          value={iscate}
          onChange={handleCate}
          labelId="demo-select-small-labe"
          id="demo-simple-select-helper"
          label="Builder"
          inputProps={{ 'aria-label': 'Without label' }}
          MenuProps={MenuProps}
          input={<BootstrapInput />}

        >
          {getCategory().map((cate,index) => 
          <MenuItem  value={cate}> {cate} </MenuItem>

          )}
        </Select>
      </FormControl>
      
      </div>
    );
  }