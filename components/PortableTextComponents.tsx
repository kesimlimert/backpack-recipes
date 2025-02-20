import React from 'react'
import { PortableTextComponents } from '@portabletext/react'

export const ingredientComponents: Partial<PortableTextComponents> = {
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-4">
        {children}
      </ul>
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700">
        {children}
      </li>
    )
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 mb-2">
        {children}
      </p>
    )
  },
  marks: {
    strong: ({ children }) => <span className="font-bold">{children}</span>,
    em: ({ children }) => <span className="italic">{children}</span>
  }
}

export const instructionComponents: Partial<PortableTextComponents> = {
  list: {
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-4 mb-4">
        {children}
      </ol>
    )
  },
  listItem: {
    number: ({ children }) => (
      <li className="text-gray-700">
        {children}
      </li>
    )
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 mb-2">
        {children}
      </p>
    )
  },
  marks: {
    strong: ({ children }) => <span className="font-bold">{children}</span>,
    em: ({ children }) => <span className="italic">{children}</span>
  }
} 