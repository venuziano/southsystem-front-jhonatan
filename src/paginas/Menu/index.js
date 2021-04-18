import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

function Menu() {
  return (
    <div>
      <nav className="nav-container">
        <Link className="link" to="/pessoas">Pessoas</Link>
        <Link className="link" to="/contas">Contas</Link>
        <Link className="link" to="/score">Scores</Link>
        <Link className="link" to="/agencias">Agências</Link>
      </nav>
    </div>
  );
}

export default Menu;