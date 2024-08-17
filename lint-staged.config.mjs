import { ESLint } from 'eslint'

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )
  const filteredFiles = files
    .filter((_, i) => !isIgnored[i])
    .map((file) => `"${file}"`)
  return filteredFiles.join(' ')
}

export default {
  '*.ts': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint ${filesToLint}`]
  },
  '*': 'prettier --ignore-unknown --write',
}
