package org.example;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Entity
@Table(name = "produto")
@Data
public class Produto {
    @Id
    private Long id;
    private String nome;
    private String tipo;
    private String descricao;
    private double peso;
    private double preco;
    private boolean disponibilidade;
}
