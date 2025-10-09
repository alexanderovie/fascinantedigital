/**
 * Script de prueba para los endpoints de auditoría
 * Prueba content_parsing y keyword_density con fascinantedigital.com
 */

const TEST_URL = 'https://fascinantedigital.com/';
const API_BASE = 'http://localhost:3000';

async function testAuditEndpoints() {
  console.log('🚀 Iniciando prueba de endpoints de auditoría...\n');

  // Paso 1: Crear una nueva auditoría
  console.log('📝 Paso 1: Creando auditoría para', TEST_URL);
  const submitResponse = await fetch(`${API_BASE}/api/auditoria/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      website: TEST_URL,
      email: 'test@fascinantedigital.com',
    }),
  });

  const submitResult = await submitResponse.json();
  console.log('✅ Auditoría creada:', submitResult);

  if (!submitResult.success) {
    console.error('❌ Error al crear auditoría:', submitResult.message);
    return;
  }

  const taskId = submitResult.taskId;
  console.log(`\n📋 Task ID: ${taskId}\n`);

  // Paso 2: Esperar a que la auditoría se complete
  console.log('⏳ Esperando a que la auditoría se complete...');
  let isComplete = false;
  let attempts = 0;
  const maxAttempts = 60; // 5 minutos máximo

  while (!isComplete && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Esperar 5 segundos
    attempts++;

    const statusResponse = await fetch(
      `${API_BASE}/api/auditoria/status/${taskId}`,
    );
    const statusResult = await statusResponse.json();

    if (statusResult.onpage?.crawl_progress === 'finished') {
      isComplete = true;
      console.log('✅ Auditoría completada!\n');
    } else {
      console.log(
        `⏳ Intento ${attempts}/${maxAttempts} - Estado: ${statusResult.onpage?.crawl_progress || 'en proceso'}`,
      );
    }
  }

  if (!isComplete) {
    console.error('❌ La auditoría no se completó en el tiempo esperado');
    return;
  }

  // Paso 3: Probar endpoint de Content Parsing
  console.log('\n🧪 Paso 3: Probando endpoint de Content Parsing...');
  const encodedUrl = encodeURIComponent(TEST_URL);
  const contentUrl = `${API_BASE}/api/auditoria/content/${taskId}?url=${encodedUrl}`;
  console.log('URL:', contentUrl);

  try {
    const contentResponse = await fetch(contentUrl);
    const contentResult = await contentResponse.json();

    if (contentResponse.ok && contentResult.success) {
      console.log('✅ Content Parsing exitoso!');
      console.log('📊 Datos obtenidos:');
      console.log('  - Title:', contentResult.content?.title || 'N/A');
      console.log(
        '  - Title Length:',
        contentResult.content?.title_length || 'N/A',
      );
      console.log(
        '  - Meta Description Length:',
        contentResult.content?.meta_description_length || 'N/A',
      );
      console.log(
        '  - Words Count:',
        contentResult.content?.words_count || 'N/A',
      );
      console.log('  - H1 Count:', contentResult.content?.h1?.length || 'N/A');
      console.log('  - H2 Count:', contentResult.content?.h2?.length || 'N/A');
    } else {
      console.error('❌ Error en Content Parsing:');
      console.error(JSON.stringify(contentResult, null, 2));
    }
  } catch (error) {
    console.error('❌ Excepción en Content Parsing:', error.message);
  }

  // Paso 4: Probar endpoint de Keyword Density
  console.log('\n🧪 Paso 4: Probando endpoint de Keyword Density...');
  const keywordsUrl = `${API_BASE}/api/auditoria/keywords/${taskId}?url=${encodedUrl}`;
  console.log('URL:', keywordsUrl);

  try {
    const keywordsResponse = await fetch(keywordsUrl);
    const keywordsResult = await keywordsResponse.json();

    if (keywordsResponse.ok && keywordsResult.success) {
      console.log('✅ Keyword Density exitoso!');
      console.log(
        '📊 Top 10 palabras clave encontradas:',
        keywordsResult.keywords?.length || 0,
        'total',
      );

      if (keywordsResult.keywords && keywordsResult.keywords.length > 0) {
        keywordsResult.keywords.slice(0, 10).forEach((kw, index) => {
          console.log(
            `  ${index + 1}. "${kw.keyword}" - ${kw.keyword_count} veces (${kw.keyword_density.toFixed(2)}%)`,
          );
        });
      }
    } else {
      console.error('❌ Error en Keyword Density:');
      console.error(JSON.stringify(keywordsResult, null, 2));
    }
  } catch (error) {
    console.error('❌ Excepción en Keyword Density:', error.message);
  }

  console.log('\n✅ Prueba completada!\n');
}

// Ejecutar el test
testAuditEndpoints().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});

