import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {

const env = loadEnv(
  'mock', 
  process.cwd(),
  '' 
)
  const processEnvValues =  Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val,
        }
      },
      {},
    )

  

  return {
    plugins: [vue()],
    define: {
      'process.env': processEnvValues
    }
  }
})