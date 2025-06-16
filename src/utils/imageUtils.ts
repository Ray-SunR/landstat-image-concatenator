export interface ImageInfo {
  id: string;
  name: string;
  src: string;
  letter: string;
  description: string;
}

// Get all available letters that have images
export const getAvailableLetters = (): string[] => {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
};

// Get all landsat images from the organized folder structure
export const getLandsatImages = (): ImageInfo[] => {
  const images: ImageInfo[] = [];
  
  // For now, we'll create a representative sample based on the folder structure
  // In a real application, you might want to fetch this dynamically from an API
  const sampleImages = [
    // Letter A
    { letter: 'A', filename: 'A_01_Hickman_ Kentucky.jpg', description: 'Hickman, Kentucky' },
    { letter: 'A', filename: 'A_02_Farm Island_ Maine.jpg', description: 'Farm Island, Maine' },
    { letter: 'A', filename: 'A_03_Lake Guakhmaz_ Azerbaijan.jpg', description: 'Lake Guakhmaz, Azerbaijan' },
    { letter: 'A', filename: 'A_04_Yukon Delta_ Alaska.jpg', description: 'Yukon Delta, Alaska' },
    { letter: 'A', filename: 'A_05_Lake Mjøsa_ Norway.jpg', description: 'Lake Mjøsa, Norway' },
    
    // Letter B
    { letter: 'B', filename: 'B_01_Holla Bend_ Arkansas.jpg', description: 'Holla Bend, Arkansas' },
    { letter: 'B', filename: 'B_02_Humaitá_ Brazil.jpg', description: 'Humaitá, Brazil' },
    
    // Letter C
    { letter: 'C', filename: 'C_01_Black Rock Desert_ Nevada.jpg', description: 'Black Rock Desert, Nevada' },
    { letter: 'C', filename: 'C_02_Deception_ Island_ Antarctica.jpg', description: 'Deception Island, Antarctica' },
    { letter: 'C', filename: 'C_03_False River_ Louisiana.jpg', description: 'False River, Louisiana' },
    
    // Letter D
    { letter: 'D', filename: 'D_01_Akimiski Island_ Canada.jpg', description: 'Akimiski Island, Canada' },
    { letter: 'D', filename: 'D_02_Lake Tandou_ Australia.jpg', description: 'Lake Tandou, Australia' },
    
    // Letter E
    { letter: 'E', filename: 'E_01_Firn-filled Fjords_ Tibet.jpg', description: 'Firn-filled Fjords, Tibet' },
    { letter: 'E', filename: 'E_02_Sea of Okhotsk.jpg', description: 'Sea of Okhotsk' },
    { letter: 'E', filename: 'E_03_Bellona Plateau.jpg', description: 'Bellona Plateau' },
    { letter: 'E', filename: 'E_04_Breiðamerkurjökull_ Iceland.jpg', description: 'Breiðamerkurjökull, Iceland' },
    
    // Letter F
    { letter: 'F', filename: 'F_01_Mato Grosso_ Brazil.jpg', description: 'Mato Grosso, Brazil' },
    { letter: 'F', filename: 'F_02_Kruger National Park_ South Africa.jpg', description: 'Kruger National Park, South Africa' },
    
    // Letter G
    { letter: 'G', filename: 'G_01_Fonte Boa_ Amazonas.jpg', description: 'Fonte Boa, Amazonas' },
    
    // Letter H
    { letter: 'H', filename: 'H_01_Southwestern Kyrgyzstan.jpg', description: 'Southwestern Kyrgyzstan' },
    { letter: 'H', filename: 'H_02_Khorinsky District_ Russia.jpg', description: 'Khorinsky District, Russia' },
    
    // Letter I
    { letter: 'I', filename: 'I_01_Borgarbyggð_ Iceland.jpg', description: 'Borgarbyggð, Iceland' },
    { letter: 'I', filename: 'I_02_Canandaigua Lake_ New York.jpg', description: 'Canandaigua Lake, New York' },
    { letter: 'I', filename: 'I_03_Etosha National Park_ Namibia.jpg', description: 'Etosha National Park, Namibia' },
    { letter: 'I', filename: 'I_04_Djebel Ouarkziz_ Morocco.jpg', description: 'Djebel Ouarkziz, Morocco' },
    { letter: 'I', filename: 'I_05_Holuhraun Ice Field_ iceland.jpg', description: 'Holuhraun Ice Field, Iceland' },
    
    // Letter J
    { letter: 'J', filename: 'J_01_Great Barrier Reef.jpg', description: 'Great Barrier Reef' },
    { letter: 'J', filename: 'J_02_Karakaya Dam_ Turkey.jpg', description: 'Karakaya Dam, Turkey' },
    { letter: 'J', filename: 'J_03_Lake Superior_ North America.jpg', description: 'Lake Superior, North America' },
    
    // Letter K
    { letter: 'K', filename: 'K_01_Sirmilik National Park_ Canada.jpg', description: 'Sirmilik National Park, Canada' },
    { letter: 'K', filename: 'K_02_Golmund_ China.jpg', description: 'Golmund, China' },
    
    // Letter L
    { letter: 'L', filename: 'L_01_Nusantara_ Indonesia.jpg', description: 'Nusantara, Indonesia' },
    { letter: 'L', filename: 'L_02_l-xingjiang-china.jpg', description: 'Xinjiang, China' },
    { letter: 'L', filename: 'L_03_Regina_ Saskatchewan_ Canada.jpg', description: 'Regina, Saskatchewan, Canada' },
    { letter: 'L', filename: 'L_04_Regina_ Saskatchewan_ Canada.jpg', description: 'Regina, Saskatchewan, Canada' },
    
    // Letter M
    { letter: 'M', filename: 'M_01_Shenandoah River_ Virginia.jpg', description: 'Shenandoah River, Virginia' },
    { letter: 'M', filename: 'M_02_Potomac River.jpg', description: 'Potomac River' },
    
    // Letter N
    { letter: 'N', filename: 'N_01_Yapacani_ Bolivia.jpg', description: 'Yapacani, Bolivia' },
    { letter: 'N', filename: 'N_02_Yapacani_ Bolivia.jpg', description: 'Yapacani, Bolivia' },
    { letter: 'N', filename: 'N_03_São Miguel do Araguaia_ Brazil.jpg', description: 'São Miguel do Araguaia, Brazil' },
    
    // Letter O
    { letter: 'O', filename: 'O_01_Crater Lake_ Oregon.jpg', description: 'Crater Lake, Oregon' },
    { letter: 'O', filename: 'O_02_Manicouagan Reservoir.jpg', description: 'Manicouagan Reservoir' },
    
    // Letter P
    { letter: 'P', filename: 'P_01_Riberalta_ Bolivia.jpg', description: 'Riberalta, Bolivia' },
    { letter: 'P', filename: 'P_02_Mackenzie River Delta_ Canada.jpg', description: 'Mackenzie River Delta, Canada' },
    
    // Letter Q
    { letter: 'Q', filename: 'Q_01_Lonar Crater_ India.jpg', description: 'Lonar Crater, India' },
    { letter: 'Q', filename: 'Q_02_Mount Tambora_ Indonesia.jpg', description: 'Mount Tambora, Indonesia' },
    
    // Letter R
    { letter: 'R', filename: 'R_01_Province of Sondrio_ Italy.jpg', description: 'Province of Sondrio, Italy' },
    { letter: 'R', filename: 'R_02_r-florida-keys.jpg', description: 'Florida Keys' },
    { letter: 'R', filename: 'R_03_Canyonlands National Park_ Utah.jpg', description: 'Canyonlands National Park, Utah' },
    { letter: 'R', filename: 'R_04_Lago Menendez_ Argentina.jpg', description: 'Lago Menendez, Argentina' },
    
    // Letter S
    { letter: 'S', filename: 'S_01_Mackenzie River.jpg', description: 'Mackenzie River' },
    { letter: 'S', filename: 'S_02_N_Djamena_ Chad.jpg', description: 'N\'Djamena, Chad' },
    { letter: 'S', filename: 'S_03_Rio Chapare_ Bolivia.jpg', description: 'Rio Chapare, Bolivia' },
    
    // Letter T
    { letter: 'T', filename: 'T_01_Liwa_ United Arab Emirates.jpg', description: 'Liwa, United Arab Emirates' },
    { letter: 'T', filename: 'T_02_Lena River Delta.jpg', description: 'Lena River Delta' },
    
    // Letter U
    { letter: 'U', filename: 'U_01_Canyonlands National Park_ Utah.jpg', description: 'Canyonlands National Park, Utah' },
    { letter: 'U', filename: 'U_02_Bamforth Wildlife Refuge_ Wyoming.jpg', description: 'Bamforth Wildlife Refuge, Wyoming' },
    
    // Letter V
    { letter: 'V', filename: 'V_01_Cellina and Meduna Rivers_ Italy.jpg', description: 'Cellina and Meduna Rivers, Italy' },
    { letter: 'V', filename: 'V_02_New South Wales_ Australia.jpg', description: 'New South Wales, Australia' },
    { letter: 'V', filename: 'V_03_Padma River_ Bangladesh.jpg', description: 'Padma River, Bangladesh' },
    { letter: 'V', filename: 'V_04_Mapleton_ Maine.jpg', description: 'Mapleton, Maine' },
    
    // Letter W
    { letter: 'W', filename: 'W_01_La Primavera_ Columbia.jpg', description: 'La Primavera, Columbia' },
    { letter: 'W', filename: 'W_02_Ponoy River_ Russia.jpg', description: 'Ponoy River, Russia' },
    
    // Letter X
    { letter: 'X', filename: 'X_01_Davis Strait_ Greenland.jpg', description: 'Davis Strait, Greenland' },
    { letter: 'X', filename: 'X_02_x-sermersooqMunicipality-greenland.jpg', description: 'Sermersooq Municipality, Greenland' },
    { letter: 'X', filename: 'X_03_Wolstenholme Fjord_ Greenland.jpg', description: 'Wolstenholme Fjord, Greenland' },
    
    // Letter Y
    { letter: 'Y', filename: 'Y_01_Estuario de Virrila_ Peru.jpg', description: 'Estuario de Virrila, Peru' },
    { letter: 'Y', filename: 'Y_02_Bíobío River_ Chile.jpg', description: 'Bíobío River, Chile' },
    { letter: 'Y', filename: 'Y_03_Ramsay_ New Zealand.jpg', description: 'Ramsay, New Zealand' },
    
    // Letter Z
    { letter: 'Z', filename: 'Z_01_Primavera do Leste_ Brazil.jpg', description: 'Primavera do Leste, Brazil' },
    { letter: 'Z', filename: 'Z_02_Mohammed Boudiaf_ Algeria.jpg', description: 'Mohammed Boudiaf, Algeria' }
  ];

  // Convert to ImageInfo objects
  sampleImages.forEach((item) => {
    const imageNumber = item.filename.match(/_(\d+)_/)?.[1] || '01';
    
    images.push({
      id: `${item.letter.toLowerCase()}-${imageNumber}`,
      name: `${item.letter}${imageNumber}`,
      src: `landsat_images/${item.letter}/${item.filename}`,
      letter: item.letter,
      description: item.description
    });
  });

  return images.sort((a, b) => a.letter.localeCompare(b.letter) || a.name.localeCompare(b.name));
};

// Function to load an image and return a promise
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Function to concatenate images horizontally with scaling
export const concatenateImages = async (
  imageSrcs: string[],
  targetHeight: number = 400
): Promise<string> => {
  if (imageSrcs.length === 0) return '';

  try {
    // Load all images in parallel
    const images = await Promise.all(imageSrcs.map(loadImage));
    
    // Calculate scaled dimensions
    const scaledImages = images.map(img => {
      const aspectRatio = img.width / img.height;
      return {
        img,
        width: Math.round(targetHeight * aspectRatio),
        height: targetHeight
      };
    });

    // Calculate total width
    const totalWidth = scaledImages.reduce((sum, { width }) => sum + width, 0);

    // Create canvas with optimized settings
    const canvas = document.createElement('canvas');
    canvas.width = totalWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance

    if (!ctx) throw new Error('Could not get canvas context');

    // Set white background for better performance
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, totalWidth, targetHeight);

    // Draw images with optimized settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium'; // Balance between quality and speed
    
    let currentX = 0;
    scaledImages.forEach(({ img, width, height }) => {
      ctx.drawImage(img, currentX, 0, width, height);
      currentX += width;
    });

    // Use lower quality for preview to improve speed
    const quality = targetHeight <= 300 ? 0.8 : 0.9;
    return canvas.toDataURL('image/jpeg', quality);
  } catch (error) {
    console.error('Error in concatenateImages:', error);
    throw error;
  }
};

// Function to download image
export const downloadImage = (dataUrl: string, filename: string = 'concatenated-image.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
