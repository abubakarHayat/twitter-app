import React from "react";
import styles from './Container.module.css'

const Container = ({ children }) => (
  <div className={["container", styles.Container].join(' ')}>
    { children }
  </div>
)

export default Container
