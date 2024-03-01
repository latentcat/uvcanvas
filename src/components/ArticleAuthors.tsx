import Link from "next/link";

type ExistName = "ciaochaos" | "shichen" | "cpunisher"
type Name = ExistName | string

interface AuthorsProps {
  names: Name | Name[]
}

interface AuthorProps {
  name: string,
  url: string
}


const existAuthors: Record<string, AuthorProps> = {
  ciaochaos: {
    name: "Troy Ni",
    url: "https://troyni.com",
  },
  shichen: {
    name: "Shichen",
    url: "https://github.com/chenbaiyujason",
  },
  cpunisher: {
    name: "Troy Ni",
    url: "https://github.com/CPunisher",
  },
  zhaohan: {
    name: "Zhaohan Wang",
    url: "https://github.com/Zhaohan-Wang",
  },
};

export function Authors(props: AuthorsProps) {

  let names = props.names
  if (typeof names === 'string') {
    names = [names]
  }

  const authors = names.map((name) => {
    if (existAuthors.hasOwnProperty(name)) {
      return existAuthors[name]
    }
    return {
      name: name,
      url: "",
    }
  })

  return (
    <>
      {authors.map((author, index, array) => (
        <span key={index}>
          {author.url ? (
            <Link href={author.url} target="_blank">{author.name}</Link>
          ) : (
            <>{author.name}</>
          )}
          {index < array.length - 1 && "、"}
        </span>
      ))}
    </>
  )
}