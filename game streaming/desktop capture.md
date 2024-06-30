keylase/nvidia-patch injects private keys into an NVFBC DLL function, enabling NVFBC desktop capture on consumer Geforce cards, so long as the GPU driver still supports NVFBC (even if deprecated).  
Nvidia Shadowplay & Steam Link supposedly still use NVFBC, meaning Valve must have partnered with Nvidia to obtain the private keys.  
  
Parsec is said to use Desktop Duplication API (DDA) for desktop capture.  
  
Looking Glass uses DDA as well as NVFBC. Their website says NVFBC is only used for Quadro cards, even though keylase/nvidia-patch exists, possibly since they don't want to breach Nvidia EULA. Meaning they probably just use DDA for Windows Desktop capture on both AMD & consumer Geforce cards.  
  
The creator of Looking Glass claims that their capture performance is still better than Parsec, although the creator of Parsec says network latency impacts the overall latency alot more, and thats why they have their own proprietary protocol Bud, which they've posted a YouTube video describing.  
  
Nvidia Gamestream was discontinued as of February 2023, meaning any GPUs released before that date will still support Gamestream as long as the drivers are not updated after Feb 2023. GPUs released after that date will just not support Gamestream outright. The same applies to Moonlight.

# questions:

- How does NVFBC work? Yes they are proprietary drivers but why doesn't AMD have their own capture drivers? They just use DD.