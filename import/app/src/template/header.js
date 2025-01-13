import { Upgrade,HomeLink, Logo } from '../aisb';
export default function Header() {
  const currentURL = window.location.href;
    return (
      <div className="header">
        <header>
           <Logo/>
            
            <div className="header-text">
            <Upgrade version={false}/>
            <HomeLink/>
            </div>
        </header>
      </div>
    );
  }