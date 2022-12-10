import { MetamaskNotInstalledError } from "../errors/metamask-not-installed.error";
import { UnsuportedNetworkError } from "../errors/unsuported-network.error";

export const ErrorMsg = {
  
  [ UnsuportedNetworkError.name ]: 'La red seleccionada no esta soportada por la aplicación, por favor cambie de red.',
  [ MetamaskNotInstalledError.name ]: 'Necesita Metamask en su navegador, por favor instale la extensión.',
  
  DEFAULT: "Ocurrió un error inesperado."

}