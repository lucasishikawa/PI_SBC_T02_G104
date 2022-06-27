<script type = "text/javascript"> 


var rua = '#ENDERECO';
var bairro = '#BAIRRO';
var cidade = '#CIDADE';
var uf = '#ESTADO';
var cep = '#CEP';

/* CODIGO BRUTO */
var $jq = jQuery.noConflict();
$jq(document).ready(function() {

  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $jq(ENDERECO).val('');
    $jq(BAIRRO).val('');
    $jq(CIDADE).val('');
    $jq(ESTADO).val('');
    $jq(CEP).val('');
  }

  //Quando o campo cep perde o foco.
  $jq(CEP).blur(function() {
    //Nova variável "cep" somente com dígitos.
    var cepx = $jq(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cepx != '') {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cepx)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $jq(ENDERECO).val('...carregando');
        $jq(BAIRRO).val('...carregando');
        $jq(CIDADE).val('...carregando');
        $jq(ESTADO).val('...carregando');

        //Consulta o webservice viacep.com.br/
        $jq.getJSON('https://viacep.com.br/ws/' + cepx + '/json/?callback=?', function(dados) {
          if (!('erro' in dados)) {
            //Atualiza os campos com os valores da consulta.
            $jq(ENDERECO).val(dados.logradouro);
            $jq(BAIRRO).val(dados.bairro);
            $jq(CIDADE).val(dados.localidade);
            $jq(ESTADO).val(dados.uf //end if.);
          } else {
            //CEP pesquisado não foi encontrado.
            limpa_formulário_cep();
            alert('CEP não encontrado.');
          }
        } //end if.);
      } else {
        //cep é inválido.
        limpa_formulário_cep();
        alert('Formato de CEP inválido.'); //end if.
      }
    } else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  });
});
</script>
