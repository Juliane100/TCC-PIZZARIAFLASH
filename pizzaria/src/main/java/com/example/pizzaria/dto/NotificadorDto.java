package com.example.pizzaria.dto;

public class NotificadorDto {

    public TipoNotificacaoDto tipoNotificacaoDto;
    public String mensagem;

    public NotificadorDto(String mensagem) {
        this.tipoNotificacaoDto = TipoNotificacaoDto.sucesso;
        this.mensagem = mensagem;
    }

    public NotificadorDto(TipoNotificacaoDto tipoNotificacaoDto, String mensagem) {
        this.tipoNotificacaoDto = tipoNotificacaoDto;
        this.mensagem = mensagem;

    }

    public String getClasse() {

        var retorno = "";

        switch (this.tipoNotificacaoDto) {

            case sucesso:
                retorno = "bg-success";
                break;

            case falha:
                retorno = "bg-danger";
                break;

            case informacao:
                retorno = "bg-info";
                break;

            default:
                break;
        }

        return retorno;
    }

}
