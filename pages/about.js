import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/About.module.css";
import CategoryHero from "../components/CategoryHero";

function About() {
  const content = [
    {
      title: "About us",
      content1: ` Our mental health charity is dedicated to providing support and
     resources to men who are struggling with mental health issues. We
     understand that seeking help can be difficult, and that is why we
     offer a range of digital resources and in-person events to make it
     as easy as possible for men to access the support they need.`,
      content2: `We are committed to providing a safe and welcoming environment for
     all men seeking help with their mental health.`
    }
  ];

  return (
    <>
      <Head>
        <title>MMH | About</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.about__bg}>
        <CategoryHero
          title={content[0].title}
          content1={content[0].content1}
          content2={content[0].content2}
        />
      </section>
    </>
  );
}

export default About;
